import { useEffect, useState } from "react";
import Grid from "./components/Grid"
import Student from "./components/Student"
import { Student as StudentType } from "./components/types";
import Total from "./components/Total";
import Filter from "./components/Filter";

const initalStudents = [
  { id: "0106", name: "Khalil" },
  { id: "011", name: "Marius Wallin" },
];

function App() {
  // STATES
  const [students, setStudents] = useState<StudentType[]>(initalStudents ?? []);
  const [filter, setFilter] = useState("-");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const filteredStudents = students.filter(
    student => filter !== "-"
      ? student.name.toLowerCase().includes(filter)
      : true)
  
  /* Alternative two
  // const options = Array.from(
  //   new Set(
  //     students.map((student) => student.name.trim().split(" ")[0].toLowerCase())
  //   )
  // ); */


  // Alternative one
  const options = Array.from(
    students
      .reduce((acc, student: StudentType) => {
        const name = student.name.trim().split(" ")[0];
        if (acc.has(name)) return acc;

        return acc.set(name, {
          ...student,
          value: name.toLowerCase(),
          label: name,
        });
      }, new Map())
      .values()
  );


  const onFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const onAddStudent = (student: { name: string }) => {
    setStudents((prev) => [...prev, { id: crypto.randomUUID(), ...student }]);
  };

  const onRemoveStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  useEffect(() => {
      setLoading(true)
    const fetchStudents = async () => {
      // ?use always try-catch for better debuggin
      try {
        //TODO: no hardcoded url. Move to config in config/index.ts
        const response = await fetch("http://localhost:3999/api/students")
        const data = await response.json()
        setStudents(data)
      } catch (error) {
        setError("Faild fetching students from server")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])
  return (
    <>
      <main>
        <Filter
          filter={filter}
          onFilterChange={onFilterChange}
          options={Object.values(options)}
        />
        <Grid onAddStudent={onAddStudent}>
          <article className="grid">
            {/* Switches "students" with "filteredStudents" to enable onFilterChange */}
            {filteredStudents.map((student) => (
              <Student
                key={student.id}
                id={student.id}
                name={student.name}
                onRemoveStudent={onRemoveStudent}
              />
            ))}
          </article>
        </Grid>
        <Total total={students.length} />
      </main>
    </>
  );
}

export default App
