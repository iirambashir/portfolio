const RealTimeTaskBoardContent = () => (
  <div className="space-y-4 mt-6">
    <p>
      This project is a fully functional real-time task board with collaborative editing using WebSockets.
    </p>
    <ul className="list-disc list-inside text-gray-700">
      <li>Real-time sync with <strong>Socket.IO</strong></li>
      <li>Optimistic UI updates + rollback</li>
      <li>SSR for board state</li>
      <li>File-based persistent storage</li>
      <li>Context API + custom WebSocket hook</li>
      <li>Modular components: Board, Column, Card, Modals</li>
      <li>Error boundaries for fault tolerance</li>
    </ul>
    <p>
      This app demonstrates my ability to architect modular and reactive frontend apps with solid backend integration.
    </p>
  </div>
);

export default RealTimeTaskBoardContent;
