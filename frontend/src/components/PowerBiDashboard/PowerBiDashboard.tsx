import style from './PowerBiDashboard.module.scss'

function PowerBiDashboard() {

    return (
        <section className={style.container}>
            <iframe title="Store Sales" src="https://app.powerbi.com/view?r=eyJrIjoiMDA4NmQ1Y2YtNTM5OC00MzMwLTg5ZjUtN2U3YTA1MzA4OWYwIiwidCI6ImI5M2Y0MDhjLWJmYjEtNGVmNC1iZDJkLTFiMGRkNmQwOGQyNSJ9" allowFullScreen={true}></iframe>
        </section>
    )
}

export default PowerBiDashboard
