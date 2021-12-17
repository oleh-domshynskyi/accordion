import React, {useState} from 'react';
import styles from './App.module.scss';
import Search from './components/search';
import Project from './components/project';
import { Modal } from 'react-bootstrap';

const projects = [
  {
    projectName: "Create Contact Formular",
    tasks: [
      {
        percent: 55,
        name: "Create Contact Card",
      },
      {
        percent: 69,
        name: "Create Form",
      },
      {
        percent: 100,
        name: "Add data",
      }
    ]
  },
  {
    projectName: "Create Subpage PSD",
    tasks: [
      {
        percent: 88,
        name: "Create components",
      },
      {
        percent: 20,
        name: "Styled components",
      }
    ]
  },
  {
    projectName: "Layout & implementation in HTML & CSS",
    tasks: [
      {
        percent: 66,
        name: "Creating the Context",
      },
      {
        percent: 100,
        name: "Implementation in the Layout",
      }
    ]
  }
]

function App() {
  const [openedIndex, setOpenedIndex] = useState(-1);
  const [openedInputIndex, setOpenedInputIndex] = useState(-1);
  const [projectSearchValue, setProjectSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  const filterProjects = projects.filter((el: any) => el.projectName.toLowerCase().indexOf(projectSearchValue.toLowerCase()) !== -1);

  return (
    <div className={styles.app}>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className={styles.formField}>
              <label htmlFor="projectName">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                onChange={((e: any) => setProjectName(e.target.value))}
                value={projectName}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="task">
                Task
              </label>
              <input
                type="text"
                id="task"
                onChange={((e: any) => setTaskName(e.target.value))}
                value={taskName}
              />
            </div>
            
            <button
              className={styles.submitBtn}
              onClick={() => (((projectName && taskName) && projects.push({projectName: `${projectName}`, tasks: [{name: `${taskName}`, percent: 0}]}), setProjectName(''), setTaskName('')))}
            >
              Create
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Search
        onChange={(e: any) => setProjectSearchValue(e.target.value)}
        onPlusClick={() => setModalVisible(true)}
      />
      {filterProjects.length > 0 ? (
        filterProjects.map((el: any, idx: number) => (
          <Project
            key={idx}
            projectName={el.projectName}
            tasks={el.tasks}
            isOpened={openedIndex === idx}
            onArrowClick={() => {
              setOpenedIndex(openedIndex === idx ? -1 : idx);
            }}
            onSearchClick={() => {
              setOpenedInputIndex(openedInputIndex === idx ? -1 : idx);
              setOpenedIndex(idx);
            }}
            isInputOpened={openedInputIndex === idx}
            onInputBlur={() => setOpenedInputIndex(-1)}
          />
        ))) : (
          <h4>No results found</h4>
      )}
      
    </div>
  );
}

export default App;
