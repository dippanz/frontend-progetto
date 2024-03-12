export default function MonoColumnSection({children, sectionContainerClasses, sectionRowClasses, sectionColumnClasses}) {
  return (
    <div className={sectionContainerClasses}>
      <div className={sectionRowClasses}>
        <div className={sectionColumnClasses}>
            {children}
        </div>
      </div>
    </div>
  );
}
