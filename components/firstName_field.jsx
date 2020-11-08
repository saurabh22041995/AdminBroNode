import React, { useState } from "react";
import {
  Label,
  Box,
  DropZone,
  BaseProperty,
  BasePropertyProps,
  DropZoneProps,
  Input,
  Button,
} from "admin-bro";

const First = (props) => {
  const { property, record, onChange } = props;
  

  const [inputs, setInputs] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const handleChange = (e) => {
    const newRecord = { ...record };
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleAdd = () => {
    const newRecord = { ...record };
    fieldArray.push(inputs);
    setFieldArray(fieldArray);
    setInputs({ name:"", password:""})
    onChange({
      ...newRecord,
      params: {
        ...newRecord.params,
        firstName: JSON.stringify(fieldArray),
      },
    });
  };


  return (
    <form>
      <div>
        <h3>Field Name</h3>
      </div>
      <div style={{ padding: "30px", paddingBottom: "90px" }}>
        <table>
          <tr>
            <th>Name</th>
            <th>Password</th>
          </tr>
          {fieldArray?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele.name}</td>
                <td>{ele.password}</td>
              </tr>
            );
          })}
        </table>
        <div style={{ float: "left", paddingRight: "10px" }}>
          <Label>Name</Label>
          <Input type="text" value={inputs?.name} name="name" onChange={handleChange} />
        </div>
        <div style={{ float: "left", paddingLeft: "10px" }}>
          <Label>password</Label>
          <Input type="password" value={inputs?.password} name="password" onChange={handleChange} />
        </div>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <span
          type="text"
          onClick={handleAdd}
          style={{
            margin: "30px",
            padding: "8px 20px",
            color: "white",
            backgroundColor: "#4268F6",
            cursor: "pointer",
          }}
        >
          Add
        </span>
      </div>
    </form>
  );
};

export default First;
