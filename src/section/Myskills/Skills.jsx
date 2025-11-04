import { useState, useEffect, useRef } from 'react';
import styles from './SkillsStyles.module.css';
import checkmarkLight from '../../assets/checkmark-light.svg';
import checkmarkDark from '../../assets/checkmark-dark.svg';
import SkillList from '../../common/SkillList';
import { useTheme } from '../../common/ThemeContext';

function Skills() {
  const { theme } = useTheme();
  const checkmarkIcon = theme === 'light' ? checkmarkLight : checkmarkDark;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
   <section id='skills' ref={sectionRef} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
    <h1 className='sectionTitle'>Skills</h1>
    <div className={styles.skillList}>
        <SkillList src={checkmarkIcon} skill='PYTHON'/>
        <SkillList src={checkmarkIcon} skill='Django'/>
        <SkillList src={checkmarkIcon} skill='PHP'/>
        <SkillList src={checkmarkIcon} skill='CODEIGNITER'/>
    </div>
    <hr/>
    <div className={styles.skillList}>
        <SkillList src={checkmarkIcon} skill='REACT'/>
        <SkillList src={checkmarkIcon} skill='JAVASCRIPT'/>
        <SkillList src={checkmarkIcon} skill='HTML'/>
        <SkillList src={checkmarkIcon} skill='CSS'/>
    </div>
    <hr/>
    <div className={styles.skillList}>
        <SkillList src={checkmarkIcon} skill='GIT'/>
        <SkillList src={checkmarkIcon} skill='GITHUB'/>
        <SkillList src={checkmarkIcon} skill='Rest Api'/>
        <SkillList src={checkmarkIcon} skill='DOCKER'/>
    
    </div>
    <hr/>

   </section>
  )
}

export default Skills