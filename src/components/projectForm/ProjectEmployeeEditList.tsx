import { Divider, List, ListItem } from '@mui/material';
import { FormikErrors, FormikTouched, getIn } from 'formik';
import React from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeError from '../../models/ProjectEmployeeError.interface';
import ProjectEmployeeEditItem from './ProjectEmployeeEditItem';

type ProjectEmployeeEditListProps = {
  projectEmployees: ProjectEmployee[];
  formikErrors: FormikErrors<ProjectEmployee>[];
  apiErrors: ProjectEmployeeError[];
  touched: FormikTouched<ProjectEmployee>[];
  setFieldValue: (field: string, value: string | undefined) => void;
  setFieldTouched: (field: string) => void;
  deleteProjectEmployee: (projectEmployeeIndex: number) => void;
};
const ProjectEmployeeEditList: React.FC<ProjectEmployeeEditListProps> = (props: ProjectEmployeeEditListProps) => {
  const { projectEmployees, formikErrors, apiErrors, touched, setFieldValue, setFieldTouched, deleteProjectEmployee } =
    props;

  return (
    <List sx={{ marginTop: '8px' }}>
      {projectEmployees.map((projectEmployee, index) => (
        <React.Fragment key={projectEmployee.id}>
          <ListItem
            id={`projectEmployees${projectEmployee.id}`}
            tabIndex={-1}
            sx={{
              paddingX: 0.5,
              outline: 'none',
            }}
          >
            <ProjectEmployeeEditItem
              index={index}
              projectEmployee={projectEmployee}
              formikErrors={getIn(formikErrors, `${index}`)}
              touched={getIn(touched, `${index}`)}
              apiError={apiErrors.find((error) => error.employeeId === projectEmployee.id)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              onDelete={() => deleteProjectEmployee(index)}
            />
          </ListItem>
          {index !== projectEmployees.length - 1 && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </List>
  );
};

const ProjectEmployeeEditListMemo = React.memo(ProjectEmployeeEditList);

export default ProjectEmployeeEditListMemo;
