import styles from "./ModelCard.module.css";

export type ModelCardProps = {
  title: string;
  description: string;
  meta?: string;
  actionHref?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function ModelCard({
  title,
  description,
  meta,
  actionHref,
  actionLabel = "Open application",
  onAction,
}: ModelCardProps) {
  const showAction = actionHref ?? onAction;

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {meta ? <p className={styles.meta}>{meta}</p> : null}
      <p className={styles.description}>{description}</p>
      {showAction ? (
        actionHref ? (
          <a className={styles.action} href={actionHref}>{actionLabel}</a>
        ) : (
          <button className={styles.actionButton} type="button" onClick={onAction}>
            {actionLabel}
          </button>
        )
      ) : null}
    </article>
  );
}
