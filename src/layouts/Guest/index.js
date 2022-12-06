const GuestLayout = ({children}) => {
    return (
        <div className="Guest-layout">
           <div>Header của người dùng</div>
               {children}
            <div>Footer của người dùng</div>
        </div>)
}
export default GuestLayout;