import {Link} from "../model/link";
import {Joint} from "../model/joint";

export interface IForceSolverPrerequisite {
  linkJoints: Map<Link, Array<{ joint: Joint; isPositive: boolean }>>;
}
