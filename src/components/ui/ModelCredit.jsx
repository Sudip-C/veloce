/**
 * The 3D model is a Ferrari 458 Italia originally created by Sketchfab
 * user "vicent091036" and redistributed via three.js's official examples.
 * The source is CC-BY licensed — attribution is a license requirement,
 * not just a courtesy, so this renders wherever the viewer does.
 */
export function ModelCredit({ className = "" }) {
  return (
    <p className={`text-[11px] text-muted-foreground ${className}`}>
      3D model:{" "}
      <a
        href="https://sketchfab.com/3d-models/ferrari-458-italia-57bf6cc56931426e87494f554df1dab6"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-muted"
      >
        Ferrari 458 Italia
      </a>{" "}
      by vicent091036 
    </p>
  );
}
