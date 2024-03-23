import {Joint} from "../model/joint";
import {SolveType} from "../services/kinematic-solver.service";

export interface IPositionSolverPrerequisite {
  // Properties specific to position solving might not be needed if the base is sufficient
  jointToSolve: Joint;
  solveType: SolveType;
  knownJointOne?: Joint;
  distFromKnownJointOne?: number;
  knownJointTwo?: Joint;
  distFromKnownJointTwo?: number;
}
