import ExceptionHandler from "../ExceptionHanlder";

const NotificationHandler: React.FC = () => (
    <div style={{
        position: "fixed",
        top: 0,
        right: 0
    }}>
        <ExceptionHandler/>
    </div>
);

export default NotificationHandler;