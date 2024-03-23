export interface IVelAccAnalyticalSolverPrerequisite {
  link: Link; // Assuming Link is a type or interface you have defined elsewhere
  solveType: 'velocity' | 'acceleration';
  solveMethod: SolveMethod;
  jointOne: Joint; // First joint being considered
  jointTwo: Joint; // Second joint being considered, if applicable
}

import {Link} from "../model/link";
import {Joint} from "../model/joint";


type SolveMethod =
  | { type: 'Rigid-Body'} // ω (angular velocity) and r (radius)
  | { type: 'Prismatic'}; // V (velocity magnitude) and θ (theta, slider crank angle)


