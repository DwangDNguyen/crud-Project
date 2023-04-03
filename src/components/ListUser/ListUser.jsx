import React, { useState, useEffect } from "react";
import "./listUser.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { orange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
const ListUser = () => {
    const person = useSelector((state) => state.person);
    const userList = useSelector((state) => {
        console.log(state.users);
        return state.users;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: orange[500],
            color: theme.palette.common.white,
            fontSize: 16,
            fontWeight: 600,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    function createData(id, name, email, age, address) {
        return { id, name, email, age, address };
    }

    const rows = userList.map((user, index) =>
        createData(user.id, user.name, user.email, user.age, user.address)
    );
    // const rows = [
    //     createData("Frozen yoghurt", 159, 6.0, 24),
    //     createData("Ice cream sandwich", 237, 9.0, 37),
    //     createData("Eclair", 262, 16.0, 24),
    //     createData("Cupcake", 305, 3.7, 67),
    //     createData("Gingerbread", 356, 16.0, 49),
    // ];
    const handleDelete = (id) => {
        dispatch(deleteUser({ id: id }));
    };
    return (
        <div className="list-user">
            <div className="list-user-title">
                <h3>List User</h3>
            </div>
            <div className="list-user-content">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">
                                    ID
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Email
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Age
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Address
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Custom
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.email}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.age}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.address}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {person.person ? (
                                            <Link to={`/update/${row.id}`}>
                                                <EditIcon
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                <EditIcon
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </Link>
                                        )}
                                        {person.person ? (
                                            <DeleteIcon
                                                style={{
                                                    marginLeft: 10,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleDelete(row.id)
                                                }
                                            />
                                        ) : (
                                            <DeleteIcon
                                                style={{
                                                    marginLeft: 10,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    navigate("/login")
                                                }
                                            />
                                        )}
                                        <Link to={`/detail/${row.id}`}>
                                            <RemoveRedEyeIcon
                                                style={{
                                                    marginLeft: 10,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ListUser;
