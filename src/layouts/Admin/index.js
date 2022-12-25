const AdminLayout = ({ children }) => {
    return (
        <div className="Admin-layout">
            <div>Sidebar</div>
            <div>Header</div>
            {children}
            <div>Footer</div>
        </div>)
}
export default AdminLayout;