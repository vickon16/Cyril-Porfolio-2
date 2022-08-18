import React, { useEffect, useState } from "react";
import "./Work.scss";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import {motion} from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import {urlFor, client} from "../../client";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1});
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({y: 100, opacity: 0})

   setTimeout(() => {
      setAnimateCard({y: 0, opacity: 1});

      if (item === "All") {
        setFilterWork(works)
      } else {
        setFilterWork(works.filter(work => work.tags.includes(item)))
      }
    }, 500);
  }


  useEffect(() => {
    const query = `*[_type == "works"]`;

    client.fetch(query).then(data => {
      setWorks(data);
      setFilterWork(data);
    })
  }, [])

  return (
    <>
      <h2 className="head-text" style={{ margin: "3rem 0" }}>
        My Creative <span>Porfolio</span>
      </h2>

      <div className="app__work-filter">
        {["UI/UX", "Web App", "React Js", "All"].map((item, index) => (
          <div
            key={item + index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}>
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-porfolio app__flex">
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={work + index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex">
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex">
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex">
                    <AiFillGithub />
                  </motion.div>
                </a>
                <a href={work.demoLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex">
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{marginTop: 10}}>{work.description}</p>

              <div className="app__work-tags app__flex p-text">
                {work.tags.map((tag, index) => (
                  <span key={tag + index}>{tag},</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);;
