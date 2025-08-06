import React from "react";

interface MainProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

interface MainFormProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

function MainBase({children, className="", ...rest}: MainProps) {
  return (
    <main className={`flex flex-col flex-grow pb-12 w-[90%] mx-auto ${className}`} {...rest}>
      {children}
    </main>
  );
}

function MainForm({children, className="", ...rest}: MainFormProps) {
  return (
    <main className={`flex flex-col flex-grow w-full pb-12 overflow-y-hidden ${className}`} {...rest}>
      <div className="bg-white py-6">
        <div className="w-[90%] mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}

MainBase.Form = MainForm;

export default MainBase;