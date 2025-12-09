import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Plan from "../../models/Plan";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  // 🔥 Save currentPlan AND update state, supports functional updates
  const setCurrentPlanAndPersist = (update) => {
    setCurrentPlan(prev => {
      const newPlan = typeof update === "function" ? update(prev) : update;
      AsyncStorage.setItem("currentPlan", JSON.stringify(newPlan));
      return newPlan;
    });
  };

  // 🔥 Load plans + restore last opened plan
  useEffect(() => {
    const loadPlans = async () => {
      const stored = await AsyncStorage.getItem("plans");
      console.log("=== LOADED RAW FROM STORAGE ===");
      console.log(stored);

      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("=== PARSED LOADED PLANS ===");
        console.log(JSON.stringify(parsed, null, 2));
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

  // In PlanContext
  const submitDay = async (dayIndex, updatedDay) => {
    // 1. Mark the day as completed
    const dayWithCompletion = { ...updatedDay, completed: true };

    // 2. Update currentPlan.days
    setCurrentPlanAndPersist(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = dayWithCompletion;
      return { ...prev, days: updatedDays };
    });

    // 3. Save to plans array
    const planToSave = { ...currentPlan, days: currentPlan.days.map((d, i) => i === dayIndex ? dayWithCompletion : d) };
    setPlans(prev => {
      const updated = prev.some(p => p.id === planToSave.id)
        ? prev.map(p => p.id === planToSave.id ? planToSave : p)
        : [...prev, planToSave];
      AsyncStorage.setItem("plans", JSON.stringify(updated));
      return updated;
    });
  };


  // 🔥 Use persistence here
  const startNewPlan = (plan = null, numDays = 2, numWeeks = 3) => {
    if (plan) {
      setCurrentPlanAndPersist({
        ...plan,
        numDays: plan.numDays ?? plan.days?.length ?? numDays,
        numWeeks: plan.numWeeks ?? numWeeks
      });
    } else {
      const newPlan = new Plan(Date.now().toString(), "Custom Plan", numDays, numWeeks);
      setCurrentPlanAndPersist(newPlan);
    }
  };

  // 🔥 Persist changes
  const updateCurrentPlanField = (field, value) => {
    setCurrentPlanAndPersist(prev => ({ ...prev, [field]: value }));
  };

  // 🔥 Persist changes
  const setDay = (dayIndex, dayObj) => {
    setCurrentPlanAndPersist(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = dayObj;
      return { ...prev, days: updatedDays };
    });
  };

  // 🔥 Persist changes
  const addMuscleGroup = (dayIndex, groupName) => {
    setCurrentPlanAndPersist(prev => {
      const days = prev.days.map(d => {
        if (d.dayIndex === dayIndex) {
          return {
            ...d,
            muscleGroups: [...d.muscleGroups, { name: groupName, exercises: [] }]
          };
        }
        return d;
      });
      return { ...prev, days };
    });
  };

  // 🔥 Persist changes
  const addExercise = (dayIndex, groupName, exercise) => {
    setCurrentPlanAndPersist(prev => {
      const days = prev.days.map(d => {
        if (d.dayIndex === dayIndex) {
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
      return { ...prev, days };
    });
  };

  // 🔥 Save to plans array AND persist
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

    console.log("=== SAVING PLAN ===");
    console.log(JSON.stringify(planToSave, null, 2));
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
        submitDay
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}


