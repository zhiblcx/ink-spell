import './index.scss'

function GlobalPending() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-black">
      <div className="ghost">
        {/* <!-- 身体部分 --> */}
        <div className="body">
          <div className="face">
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="smile"></div>
            {/* <!-- 腮红 --> */}
            <div className="rosy left"></div>
            <div className="rosy right"></div>
          </div>
          {/* <!-- 手臂 --> */}
          <div className="arm left"></div>
          <div className="arm right"></div>
          {/* <!-- 尾部 --> */}
          <div className="bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {/* <!-- 影子 --> */}
        <div className="shadow"></div>
      </div>
    </div>
  )
}

export default GlobalPending
