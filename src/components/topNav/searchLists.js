import React from "react";
import "./header.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { complete, deleteTask, update } from "../store/taskSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch} from "react-redux";
import Card from "react-bootstrap/Card";
import { updateFilter } from '../store/filterSlice';
import { searchRedux } from "../store/searchSlice";

const SearchLists = ({searchValue, setSearchValue, filteredList, setFilteredList }) => {
    const taskArray = useSelector((state) => state.taskList.tasks);
    const dispatch= useDispatch();

    const filterSearch = (e)=>{
        const searchKey = e.target.value;
        setSearchValue(searchKey)

        const filterKey = taskArray.filter((item)=>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
        )

        
        if(searchValue=""){
            setFilteredList([])
        }else{
            setFilteredList(filterKey)
            dispatch(searchRedux(searchValue)) 
            dispatch(updateFilter(filteredList)) 
            
            
        }
    }
    
    console.log("searchValue", searchValue)
    console.log("filteredList", filteredList)

  return (
    <>
      <Form.Control
        placeholder="Search..."
        aria-label="Username"
        aria-describedby="basic-addon1"
        className="search-text2 rounded py-2 "
        onChange={filterSearch}
      />
      <SearchIcon className="position-absolute text-dark search-icon-one" />

      
    </>
  );
};

export default SearchLists;
