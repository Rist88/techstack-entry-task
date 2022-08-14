import { useState } from "react";
import Head from "next/head";
import stringifyObject from "stringify-object";
import calculateTeamFinanceReport from "../utils/getReport";
import styles from "../styles/Home.module.css";

export default function Home() {
  // initial test values
  const salariesInit = {
    TeamLead: {
      salary: 1000,
      tax: "99%",
    },
    Architect: {
      salary: 9000,
      tax: "34%",
    },
  };

  const teamInit = [
    {
      name: "Alexander",
      specialization: "TeamLead",
    },
    {
      name: "Gaudi",
      specialization: "Architect",
    },
    {
      name: "Koolhas",
      specialization: "Architect",
    },
    {
      name: "Foster",
      specialization: "Architect",
    },
    {
      name: "Napoleon",
      specialization: "General",
    },
  ];

  const [salariesData, setSalariesData] = useState(salariesInit);
  const [teamData, setTeamData] = useState(teamInit);

  const prettifyObj = (obj) =>
    stringifyObject(obj, {
      indent: "  ",
      singleQuotes: false,
    });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <main>
          <h1>Calculate salary by team.</h1>
          <div style={{ display: "flex", gap: "5em" }}>
            <div>
              <h2>Salary info:</h2>
              <label>
                Enter salaries data:
                <br />
                <input
                  type={"text"}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSalariesData(eval(`(${e.target.value})`));
                      console.log(stringifyObject(salariesData));
                    }
                  }}
                />
              </label>
              <hr />
              <pre>{prettifyObj(salariesData)}</pre>
            </div>
            <div>
              <h2>Team info:</h2>
              <label>
                Enter team data:
                <br />
                <input
                  type={"text"}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTeamData(eval(`(${e.target.value})`));
                      console.log(stringifyObject(teamData));
                    }
                  }}
                />
              </label>
              <hr />
              <pre>{prettifyObj(teamData)}</pre>
            </div>
          </div>
          <div>
            <h2>Report:</h2>
            <pre>
              {prettifyObj(calculateTeamFinanceReport(salariesData, teamData))}
            </pre>
          </div>
        </main>
        <footer
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <em
            style={{
              marginBottom: "1em",
              contentFit: "max-content",
            }}
          >
            made with ✨ for Techstack Ltd by{" "}
            <a href="https://www.linkedin.com/in/rist88/">Rist88</a>💙💛
          </em>
        </footer>
      </div>
    </div>
  );
}
