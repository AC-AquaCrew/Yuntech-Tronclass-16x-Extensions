(() => {
	if (window.showFloatingWindow) return;

	window.showFloatingWindow = function (message) {
		const id = "__popup__";
		const styleId = "__popup_style__";

		document.getElementById(id)?.remove();

		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.textContent = `
				#${id} {
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 2147483647;
					width: 340px;
					max-width: calc(100vw - 24px);
					background: #fff7fb;
					border: 1px solid #f3c6da;
					border-radius: 22px;
					padding: 22px 20px 18px;
					box-shadow: 0 12px 30px rgba(255,105,180,.18);
					font-family: sans-serif;
				}

				#${id} .row {
					display: flex;
					align-items: center;
					position: relative;
					margin-bottom: 14px;
				}

				#${id} .title {
					font-size: 20px;
					font-weight: 600;
					letter-spacing: 0.5px;
					color: #ff4fa0;
				}

				#${id} .close {
					position: absolute;
					right: -6px;
					top: -6px;
					border: none;
					width: 34px;
					height: 34px;
					border-radius: 50%;
					cursor: pointer;
					background: #ffe3f0;
					font-size: 18px;
					color: #ff4fa0;
					transition: 0.2s;
				}

				#${id} .close:hover {
					background: #ffd3e7;
					transform: scale(1.05);
				}

				#${id} .body {
					font-size: 15px;
					line-height: 1.6;
					white-space: pre-wrap;
					word-break: break-word;
					color: #6d3a58;
				}
			`;
			document.head.appendChild(style);
		};

		const el = document.createElement("div");
		el.id = id;
		el.innerHTML = `
			<div class="row">
				<div class="title">※nofition◝(・▿・)◜</div>
				<button class="close">×</button>
			</div>
			<div class="body"></div>
    	`;

		el.querySelector(".body").textContent = String(message);
		el.querySelector(".close").addEventListener("click", () => el.remove());

		document.body.appendChild(el);
	};
})();