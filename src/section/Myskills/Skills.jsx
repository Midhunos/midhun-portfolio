import styles from './SkillsStyles.module.css';
import checkmarkIcon from '../../assets/checkmark-dark.svg'
import SkillList from '../../common/SkillList';

function Skills() {
  return (
   <section id='skills' className={styles.container}>
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
        <SkillList src={checkmarkIcon} skill='Rest Api'/>
    
    </div>
    <hr/>

   </section>
  )
}

export default Skills