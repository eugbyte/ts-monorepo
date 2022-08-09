import * as Sleep from "./sleep";
import * as Log from "./log";

// redeclare to prevent jest sypOn bug on index files (https://stackoverflow.com/a/53307822/6514532)
export const { greet } = Log;
export const { sleep } = Sleep;
