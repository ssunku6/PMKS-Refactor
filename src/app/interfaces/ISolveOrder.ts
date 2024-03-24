import {Joint} from "../model/joint";
import {RigidBody} from "../model/link";
import {IVelAccAnalyticalSolverPrerequisite} from "./IVelAccAnalyticalSolverPrerequisite";
import {IPositionSolverPrerequisite} from "./IPositionSolverPrerequisite";
import {IVelAccGraphicalSolverPrerequisite} from "./IVelAccGraphicalSolverPrerequisite";
import {IStressSolverPrerequisite} from "./IStressSolverPrerequisite";
import {IForceSolverPrerequisite} from "./IForceSolverPrerequisite";

export interface ISolveOrder {
  subMechanism: Map<Joint, RigidBody[]>[]; // Assuming this is common to all solvers
  solverType: string; // Consider making this more specific or utilizing it for dynamic solver handling
  order: number[]; // Make sure the purpose of this order is clear and necessary
  prerequisites: Map<number, SolverSpecificPrerequisite>; // This could be a union of specific prerequisite types
}

// Example of a union type for specific prerequisites, including one for velocity/acceleration
type SolverSpecificPrerequisite = IPositionSolverPrerequisite | IVelAccAnalyticalSolverPrerequisite | IVelAccGraphicalSolverPrerequisite | IStressSolverPrerequisite | IForceSolverPrerequisite; // update accordingly

