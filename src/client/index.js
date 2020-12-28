import { handleSubmit } from "./js/app";

// import styles
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/footer.scss";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-trip').addEventListener('click', handleSubmit);
});
