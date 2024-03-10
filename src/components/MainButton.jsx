import styles from "./mainbutton.module.css";

export default function MainButton() {
  return (
    <div className={styles.align}>
      <h4>노래명과 가수명을 입력해보세요</h4>
      <input className={styles.input} type="input"></input>
      <button className={styles.SearchButton} type="button">
        search
      </button>
    </div>
  );
}
