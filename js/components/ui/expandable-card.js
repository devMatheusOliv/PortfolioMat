// ProjectStatusCard Component
class ProjectStatusCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      height: 0,
    };
    this.contentRef = React.createRef();
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isExpanded !== this.state.isExpanded) {
      this.updateHeight();
    }
  }

  updateHeight() {
    const { isExpanded } = this.state;
    const contentHeight = isExpanded ? this.contentRef.current.scrollHeight : 0;
    this.setState({ height: contentHeight });
  }

  toggleExpand() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    const {
      title,
      progress,
      dueDate,
      contributors,
      tasks,
      githubStars,
      openIssues,
      repoUrl,
    } = this.props;
    const { isExpanded } = this.state;

    // Formatação da data
    const formattedDate = new Date(dueDate).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Altura do conteúdo expandido
    const contentHeight = isExpanded
      ? this.contentRef.current?.scrollHeight + "px"
      : "0px";

    return (
      <div className={`project-status-card ${isExpanded ? "expanded" : ""}`}>
        <div className="project-status-header" onClick={this.toggleExpand}>
          <div className="project-status-info">
            <h3 className="project-status-title">{title}</h3>
            <div className="project-status-badges">
              <span className="project-status-badge progress">
                <i className="fas fa-tasks"></i> {progress}%
              </span>
              <span className="project-status-badge due-date">
                <i className="far fa-calendar"></i> {formattedDate}
              </span>
            </div>
          </div>
          <button className="project-status-toggle">
            <i className={`fas fa-chevron-${isExpanded ? "up" : "down"}`}></i>
          </button>
        </div>

        <div
          className="project-status-details"
          style={{ height: contentHeight }}
          ref={this.contentRef}
        >
          <div className="project-status-content">
            <div className="project-status-section">
              <h4>Progresso</h4>
              <div className="project-status-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{progress}% Completo</span>
              </div>
            </div>

            <div className="project-status-section">
              <h4>Colaboradores</h4>
              <div className="project-status-contributors">
                {Array.isArray(contributors) ? (
                  contributors.map((contributor, index) => (
                    <span key={index} className="contributor-badge">
                      {contributor}
                    </span>
                  ))
                ) : (
                  <span className="contributor-badge">
                    {contributors} pessoas
                  </span>
                )}
              </div>
            </div>

            <div className="project-status-section">
              <h4>Tarefas Recentes</h4>
              <ul className="project-status-tasks">
                {tasks.map((task, index) => (
                  <li key={index} className={task.completed ? "completed" : ""}>
                    <i
                      className={`fas ${
                        task.completed ? "fa-check-circle" : "fa-circle"
                      }`}
                    ></i>
                    {task.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-status-section">
              <h4>GitHub</h4>
              <div className="project-status-github">
                <span className="github-stat">
                  <i className="fas fa-star"></i> {githubStars} stars
                </span>
                <span className="github-stat">
                  <i className="fas fa-exclamation-circle"></i> {openIssues}{" "}
                  issues
                </span>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <i className="fab fa-github"></i> Ver Repositório
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Componente React para cards expansíveis
const ExpandableCard = ({ project }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Calcula a porcentagem de progresso
  const progressPercent = project.progress || 0;

  // Formata a data de entrega
  const formatDate = (dateString) => {
    if (!dateString) return "Em andamento";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className={`project-card ${expanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
        <div className="project-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="progress-text">{progressPercent}%</span>
        </div>
      </div>

      <div className="project-card-content">
        <div className="project-meta">
          <div className="meta-item">
            <i className="fas fa-calendar"></i>
            <span>Entrega: {formatDate(project.dueDate)}</span>
          </div>

          <div className="meta-item">
            <i className="fas fa-users"></i>
            <span>Colaboradores: {project.contributors || 1}</span>
          </div>
        </div>

        {expanded && (
          <div className="project-details">
            <div className="project-tasks">
              <h4>Tarefas</h4>
              <ul>
                {project.tasks &&
                  project.tasks.map((task, index) => (
                    <li
                      key={index}
                      className={task.completed ? "completed" : ""}
                    >
                      {task.name}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="project-stats">
              {project.githubStars !== undefined && (
                <div className="stat-item">
                  <i className="fab fa-github"></i>
                  <span>{project.githubStars} stars</span>
                </div>
              )}

              {project.openIssues !== undefined && (
                <div className="stat-item">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{project.openIssues} issues</span>
                </div>
              )}
            </div>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fas fa-code-branch"></i> Ver Repositório
              </a>
            )}
          </div>
        )}
      </div>

      <div className="card-expand-icon">
        <i className={`fas fa-chevron-${expanded ? "up" : "down"}`}></i>
      </div>
    </div>
  );
};
