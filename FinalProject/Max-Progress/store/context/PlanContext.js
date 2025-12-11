import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Plan from "../../models/Plan";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  
  const setCurrentPlanAndPersist = (update) => {
    setCurrentPlan(prev => {
      const newPlan = typeof update === "function" ? update(prev) : update;
      AsyncStorage.setItem("currentPlan", JSON.stringify(newPlan));
      return newPlan;
    });
  };

  
  useEffect(() => {
    const loadPlans = async () => {
      const stored = await AsyncStorage.getItem("plans");
      //console.log("=== LOADED ===");
      //console.log(stored);

      if (stored) {
        const parsed = JSON.parse(stored);
        //console.log("=== PARSED LOADED PLANS ===");
        //console.log(JSON.stringify(parsed, null, 2));
        setPlans(parsed);
      }

      // restore last opened plan
      const last = await AsyncStorage.getItem("currentPlan");
      if (last) {
        setCurrentPlan(JSON.parse(last));
      }
    };

    loadPlans();
  }, []);

  const submitDay = async (weekIndex, dayIndex, updatedDay) => {
    const dayWithCompletion = { ...updatedDay, completed: true };

    setCurrentPlanAndPersist(prev => {
      const updatedWeeks = [...prev.weeks];
      updatedWeeks[weekIndex].days[dayIndex] = dayWithCompletion;
      return { ...prev, weeks: updatedWeeks };
    });

    // Save to plans array
    const planToSave = { ...currentPlan };
    planToSave.weeks[weekIndex].days[dayIndex] = dayWithCompletion;

    setPlans(prev => {
      const updated = prev.some(p => p.id === planToSave.id)
        ? prev.map(p => p.id === planToSave.id ? planToSave : p)
        : [...prev, planToSave];
      AsyncStorage.setItem("plans", JSON.stringify(updated));
      return updated;
    });
  };



  const startNewPlan = (titleOrPlan = null, numDays = 2, numWeeks = 3) => {
    if (titleOrPlan && typeof titleOrPlan === "object") {
      const plan = titleOrPlan;
      const planDays = plan.days || [];
      const weeks = [];
      for (let w = 0; w < numWeeks; w++) {
        const daysForWeek = planDays
          .slice(w * numDays, (w + 1) * numDays)
          .map(d => ({ ...d }));
        weeks.push({ days: daysForWeek });
      }

      setCurrentPlanAndPersist({
        ...plan,
        numDays,
        numWeeks,
        weeks,
        title: plan.title || "Custom Plan",
      });

    } else {
      const title = typeof titleOrPlan === "string" ? titleOrPlan : "Custom Plan";

      const weeks = Array.from({ length: numWeeks }, (_, w) => ({
        days: Array.from({ length: numDays }, (_, d) => ({
          dayIndex: d,
          completed: false,
          muscleGroups: [],
        }))
      }));

      const newPlan = {
        id: Date.now().toString(),
        title,
        numDays,
        numWeeks,
        weeks,
      };

      setCurrentPlanAndPersist(newPlan);
    }
  };



  const updateCurrentPlanField = (field, value) => {
    setCurrentPlanAndPersist(prev => ({ ...prev, [field]: value }));
  };

  const setDay = (dayIndex, dayObj) => {
    setCurrentPlanAndPersist(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = dayObj;
      return { ...prev, days: updatedDays };
    });
  };

  const addMuscleGroup = (dayIndex, group) => {
    setCurrentPlanAndPersist(prev => {
      const updatedWeeks = prev.weeks.map(week => ({
        ...week,
        days: week.days.map(d => {
          if (d.dayIndex === dayIndex) {
            return {
              ...d,
              muscleGroups: [...d.muscleGroups, { ...group, exercises: [] }]
            };
          }
          return d;
        })
      }));
      return { ...prev, weeks: updatedWeeks };
    });
  };


  // Add exercise to a day across all weeks
  const addExercise = (dayIndex, groupName, exercise) => {
    setCurrentPlanAndPersist(prev => {
      const weeks = prev.weeks.map(week => {
        const days = week.days.map((d, i) => {
          if (i === dayIndex) {
            return {
              ...d,
              muscleGroups: d.muscleGroups.map(g => {
                if (g.name === groupName) {
                  return { ...g, exercises: [...g.exercises, exercise] };
                }
                return g;
              })
            };
          }
          return d;
        });
        return { ...week, days };
      });
      return { ...prev, weeks };
    });
  };


  
  const saveCurrentPlan = async () => {
    if (!currentPlan) return;

    const planToSave = JSON.parse(JSON.stringify(currentPlan));

    setPlans(prev => {
      let updated;

      if (prev.some(p => p.id === planToSave.id)) {
        updated = prev.map(p => (p.id === planToSave.id ? planToSave : p));
      } else {
        updated = [...prev, planToSave];
      }

      AsyncStorage.setItem("plans", JSON.stringify(updated));
      return updated;
    });

    //console.log("=== SAVING PLAN ===");
    //console.log(JSON.stringify(planToSave, null, 2));
  };

  const clearCurrentPlan = () => {
    setCurrentPlan(null);
    AsyncStorage.removeItem("currentPlan");
  };

  return (
    <PlanContext.Provider
      value={{
        plans,
        currentPlan,
        startNewPlan,
        updateCurrentPlanField,
        setDay,
        addMuscleGroup,
        addExercise,
        saveCurrentPlan,
        clearCurrentPlan,
        setCurrentPlanAndPersist,
        submitDay,
        setPlans
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}


