import { useState } from "react";
import { QUERY_STATUS } from "~/models/enums";

type QueryFn = (...args: any[]) => Promise<any>;
// accepts the query function that makes the http call
// return the query status (Uninitialized, loading, success, error), 
// a function to trigger the http callback with similar digital signature to it, 
// and the result of the callback
// eslint-disable-next-line @typescript-eslint/ban-types
export const useHttpQuery = (httpCallback: QueryFn): [QUERY_STATUS, QueryFn] => {
    const [subQueryStatus, setSubQueryStatus] = useState(QUERY_STATUS.UNINITIALIZED);

    let res: any = {};

    const makeQuery: QueryFn = async(...args) => {
        setSubQueryStatus(QUERY_STATUS.LOADING);
        try {
            res = await httpCallback(...args);
            console.log(res);
            setSubQueryStatus(QUERY_STATUS.SUCCESS);
        } catch(err) {
            console.error(err);
            setSubQueryStatus(QUERY_STATUS.ERROR);
        }
    }

    return [subQueryStatus, makeQuery];
}