const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="p-8 lg:p-28 w-screen h-screen">{children}</div>
}

export default layout
