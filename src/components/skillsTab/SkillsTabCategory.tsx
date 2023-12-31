import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Skill } from '../../models/Skill.interface';
import { ExpandedSkillRoot } from '../../store/types/skills';
import SkillListItem from './ListComponents/SkillListItem';
import { sortBySkill } from './utils';

type SkillsTabCategoryProps = {
  currentSkill: Skill;
  skillsData: Skill[];
  mapData: (skillsData: Skill[]) => ReactNode;
};
const SkillsTabCategory: React.FunctionComponent<SkillsTabCategoryProps> = (props: SkillsTabCategoryProps) => {
  const { currentSkill, mapData, skillsData } = props;
  const expanded = useSelector((state: ExpandedSkillRoot) => state.expandedSkill.value);

  useEffect(() => {
    setIsCollapsed(expanded);
  }, [expanded]);
  const [isCollapsed, setIsCollapsed] = useState(expanded);

  const mapSkills = (skills: Skill[]) => {
    return skills.map((skill: Skill) => {
      if (skill.showOnFilter) {
        return <SkillListItem skill={skill} key={skill.skillId} />;
      }
    });
  };

  return (
    <>
      <List
        component="ul"
        key={currentSkill.skillId}
        disablePadding
        sx={{
          border: 1,
          marginLeft: currentSkill.indent * 6,
          backgroundColor: 'white',
          ...(currentSkill.hasError
            ? {
                borderColor: '#ef4349',
                color: '#ef4349',
              }
            : {
                borderColor: '#DDDDDD',
                color: 'primary.main',
              }),
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <ListItemText primary={currentSkill.skillName} />
            {currentSkill.selectedCount ? (
              <Box
                marginRight="20px"
                padding="15px"
                paddingBottom="1px"
                paddingTop="1px"
                borderRadius="16px"
                fontWeight="700"
                sx={{ backgroundColor: 'secondary.main', color: 'primary.main' }}
              >
                {currentSkill.selectedCount}
              </Box>
            ) : null}
            {isCollapsed ? <ExpandLess /> : <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapsed}>
          {currentSkill.subItemsAreSkills
            ? mapSkills(
                skillsData.filter((skill: Skill) => currentSkill.skillId === skill.parentSkillId).sort(sortBySkill),
              )
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentSkill.subItemsAreSkills
          ? mapData(skillsData.filter((skill: Skill) => skill.parentSkillId === currentSkill.skillId).sort(sortBySkill))
          : null}
      </Collapse>
    </>
  );
};

export default SkillsTabCategory;
