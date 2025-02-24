const CurrentBalanceBox = () => {
  const { balance } = useBalance()
  return (
    <div className="current-balance-box">
      <h2>Current Balance</h2>
      <p>{balance}</p>
    </div>
  )
}
export default CurrentBalanceBox
