import './ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import Project from '../../models/Project.interface';
import { ProjectsService } from '../../services/projects.service';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectForm from '../projectForm/ProjectForm';
import ProjectFilter from './ProjectFilter';
import ProjectProfilesResult from './ProjectProfilesResults';
import CustomSnackbar from '../customSnackbar/CustomSnackbar';

const ProjectProfiles = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [addedProjectId, setAddedProjectId] = useState<number>();
  const [filterTextValue, setFilterTextValue] = useState('All');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const projectsService = new ProjectsService();

  useEffect(() => {
    getProjects();
  }, []);

  const rerenderProjects = () => {
    getProjects();
  };

  const getProjects = async () => {
    const projects = await projectsService.getAllProjects();
    setProjects(projects);
  };

  const closeProjectForm = (project?: Project) => {
    setOpenPopup(false);
    if (project) {
      setAddedProjectId(project.id);
      setSnackbarMessage(`Project "${project.title}" successfully created.`);
      setOpenSnackbar(true);
    }
    getProjects();
  };

  const handleProjectDelete = async (id: number) => {
    await projectsService.deleteProjectById(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  const filteredProjectsList = projects.filter((project) => {
    if (filterTextValue === ProjectStatus.ONGOING) {
      return project.status === ProjectStatus.ONGOING;
    } else if (filterTextValue === ProjectStatus.FINISHED) {
      return project.status === ProjectStatus.FINISHED;
    } else if (filterTextValue === ProjectStatus.FUTURE) {
      return project.status === ProjectStatus.FUTURE;
    } else {
      return project;
    }
  });

  const onFilterValueSelection = (filterValue: string) => {
    setFilterTextValue(filterValue);
  };

  return (
    <div className="project-profiles-container">
      <Stack direction="row">
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 250,
            left: -205,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              left: 0,
            }}
          >
            <ProjectFilter onFilterValueSelection={onFilterValueSelection} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 300,
            left: -180,
          }}
        >
          <Box
            sx={{
              display: filteredProjectsList.length === 0 ? 'none' : 'inline',
              color: 'primary.main',
              fontSize: 14,
            }}
          >
            {filterTextValue === 'All'
              ? filteredProjectsList.length + ' projects found'
              : filteredProjectsList.length + " '" + filterTextValue + "' projects found"}
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 145,
            left: 440,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              left: 0,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              id="addNewProject"
              onClick={() => setOpenPopup(true)}
              sx={{
                my: 1,
              }}
            >
              Add new project
            </Button>
          </Box>
        </Stack>
      </Stack>
      {openPopup && <ProjectForm onClose={closeProjectForm} />}
      <Box
        sx={{
          position: 'relative',
          my: 2,
          width: 1344,
          left: -205,
        }}
      >
        <ProjectProfilesResult
          rerender={rerenderProjects}
          projects={filteredProjectsList}
          handleProjectDelete={handleProjectDelete}
          focusProjectId={addedProjectId}
          filterStatus={filterTextValue}
          snackbarProps={{ setOpenSnackbar: setOpenSnackbar, setSnackbarMessage: setSnackbarMessage }}
        />
      </Box>
      <CustomSnackbar open={openSnackbar} setOpen={setOpenSnackbar} message={snackbarMessage} />
    </div>
  );
};

export default ProjectProfiles;
