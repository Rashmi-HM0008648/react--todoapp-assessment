import {React} from "react";
import styles from './filter.module.scss'

import { useDispatch,useSelector } from "react-redux";
const FilterTask = () => {
    const filterStatus = useSelector(state => state.filterStatus);
    const dispatch = useDispatch();
    const updateFilter=(e)=>
    {
        debugger
        const selectedOption = e.target.value;
        dispatch({
            type: 'UpdateFilterStatus', payload: selectedOption
        })
    }
    return (
        <select className={styles.dropdown} value={filterStatus}  onChange={updateFilter}>
            <option value="all">All</option>
            <option value="incompleted">Active</option>
            <option value="completed">Completed</option>
        </select>
    );
}
export default FilterTask;