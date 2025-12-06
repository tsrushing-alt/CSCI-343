import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Plan from "../../models/Plan";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      const stored = await AsyncStorage.getItem("plans");
      if (stored) setPlans(JSON.parse(stored));
    };
    loadPlans();
  }, []);

  const startNewPlan = (plan = null, numDays = 2, numWeeks = 3) => {
    if (plan) {
      setCurrentPlan({
        ...plan,
        numDays: plan.numDays ?? plan.days?.length ?? numDays,
        numWeeks: plan.numWeeks ?? numWeeks
      });
    } else {
      const newPlan = new Plan(Date.now().toString(), "Custom Plan", numDays, numWeeks);
      setCurrentPlan(newPlan);
    }
  };


  const updateCurrentPlanField = (field, value) => {
    setCurrentPlan(prev => ({ ...prev, [field]: value }));
  };

  const setDay = (dayIndex, dayObj) => {
    setCurrentPlan(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = dayObj;
      return { ...prev, days: updatedDays };
    });
  };

  const addMuscleGroup = (dayIndex, groupName) => {
    setCurrentPlan(prev => {
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

  const addExercise = (dayIndex, groupName, exercise) => {
    setCurrentPlan(prev => {
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

  const saveCurrentPlan = async () => {
    if (!currentPlan) return;
    const planToSave = JSON.parse(JSON.stringify(currentPlan));
    setPlans(prev => {
      if (prev.some(p => p.id === planToSave.id)) return prev;
      const updated = [...prev, planToSave];
      AsyncStorage.setItem("plans", JSON.stringify(updated));
      return updated;
    });
  };


  const clearCurrentPlan = () => setCurrentPlan(null);

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
        clearCurrentPlan
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

