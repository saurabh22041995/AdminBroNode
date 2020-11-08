import React  from 'react';
import {Label,Box,DropZone, BaseProperty, BasePropertyProps, DropZoneProps, Button} from 'admin-bro';

const UploadPhoto = (props) => {
    const { property, record, onChange } = props
    console.log(property);
    const onUpload = (files) => {
      console.log(files);
      const newRecord = {...record}
      const file = files.length && files[0]
 
      onChange({
        ...newRecord,
        params: {
          ...newRecord.params,
          [property.name]: file,
        }
      })
      event.preventDefault()
    }
 
    return (
      <Box>
        <Label>{property.label}</Label>
        <DropZone onChange={onUpload} />
        
      </Box>
    )
 }

export default UploadPhoto;

