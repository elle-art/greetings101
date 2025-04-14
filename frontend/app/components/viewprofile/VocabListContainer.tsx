import { Language } from "@/types/Courses";
import { useCourses } from "@/utils/courses/CourseContext";
import { Box, Card, styled, Tab, Tabs } from "@mui/material"
import React from "react";
import VocabList from "./VocabList";
import { useUser } from "@/utils/user/UserContext";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    usercolor: string;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))<StyledTabsProps>(({ usercolor }) =>({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 60,
        width: '100%',
        backgroundColor: usercolor,
    },
}));

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: '#fff', backgroundColor: theme.palette.background.paper, borderRadius: '20% 20% 0 0', display: 'block'
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ width: "100%" }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const VocabListContainer = () => {
    const { myCourses, completed_courses } = useCourses();
    const [value, setValue] = React.useState(0);
    const { user } = useUser();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <StyledTabs
                value={value}
                onChange={handleChange}
                usercolor={`${user?.preferences.pfColor}`}
                aria-label="Courses tabs"
                sx={{ bgcolor: `${user?.preferences.pfColor}` }}
            >
                {myCourses.map((course, idx) => (
                    <StyledTab key={course.id} label={course.shortname} {...a11yProps(idx)} />))}
                {completed_courses.map((course, idx) => (
                    <StyledTab key={course.id} label={course.shortname} {...a11yProps(idx)} />))}
            </StyledTabs>
            {myCourses.map((course, idx) => (
                <TabPanel key={course.id} value={value} index={idx}>
                    {course.lessons.slice(0, course.lessons_completed).map((lesson) => (
                        <VocabList key={lesson.lesson_no} lesson_name={lesson.name} lesson_words={lesson.words} language={(course.shortname.split(" ")[0].toLowerCase()) as Language} />
                    ))}
                </TabPanel>))}
            {completed_courses.map((course, idx) => (
                <TabPanel key={course.id} value={value} index={idx}>
                    {course.lessons.slice(0, course.lessons_completed).map((lesson) => (
                        <VocabList key={lesson.lesson_no} lesson_name={lesson.name} lesson_words={lesson.words} language={(course.shortname.split(" ")[0].toLowerCase()) as Language} />
                    ))}
                </TabPanel>))}
        </div>
    )
}

export default VocabListContainer;
