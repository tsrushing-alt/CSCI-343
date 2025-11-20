import Plans from "../models/plans";

const PLANS = [
  new Plans(
    "p1",
    "Full Body Beginner",
    3,     // days per week
    8      // weeks
  ),
  new Plans(
    "p2",
    "Push / Pull / Legs",
    6,
    12
  ),
  new Plans(
    "p3",
    "Upper / Lower Strength",
    4,
    10
  ),
  new Plans(
    "p4",
    "Hypertrophy Builder",
    5,
    16
  ),
  new Plans(
    "p5",
    "Athletic Conditioning",
    4,
    6
  )
];

export default PLANS;