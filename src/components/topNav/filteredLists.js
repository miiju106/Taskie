import React from 'react'
import { useSelector, useDispatch} from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { complete, deleteTask} from "../store/taskSlice";


import Card from "react-bootstrap/Card";

const FilteredLists = () => {
    const filteredArray = useSelector((state) => state.filterInput.filter);
        const searchString = useSelector((state) => state.searchInput.search);
    const dispatch = useDispatch()

    console.log( "filteredArray", filteredArray)
    console.log("SearchString", searchString)

  return (
    <>
    <Row>
        <Col>
        {searchString.lenght != 0 ? (filteredArray.slice(0,5).map((list)=>(
            <Card className="border-0 bg-white card-task mb-2 p-3">
            <div className="d-flex justify-content-between">
              <h5 className="fw-semibold  h5-text">{list.title}</h5>
              <DeleteOutlineOutlinedIcon  onClick={()=> dispatch(deleteTask(list))}/>
            </div>
            <div className="mt-2">
              <p className="body-p">{list.task}...</p>
            </div>
            <div>
              <p className="date-p">
                Date Created:{list.dateCreated}
              </p>
            </div>
            <div className="d-flex justify-content-between ">
              <div>
                <span className="me-2">Edit</span>
                <span>View</span>
              </div>
              <div>
                <div>
                  {list.completed ? (
                    <CheckBoxIcon
                      className="checked"
                      onClick={() => dispatch(complete(list))}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      onClick={() => dispatch(complete(list))}
                    />
                  )}
                  <span>
                    {list.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))) 
        : (<h5>There are no searc results</h5>)}
        </Col>
        
        
    </Row>
    </>
  )
}

export default FilteredLists