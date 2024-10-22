let ans = JSON.parse(localStorage.getItem("tasks")) || [];
        let btn = document.getElementById("add");
        const themeToggle = document.getElementById('theme-toggle');

        // Load tasks from localStorage on page load
        window.onload = () => {
            ans.forEach((task) => {
                addTaskToDiv(task, task.isCompleted);
            });
            const currentTheme = localStorage.getItem("theme") || "light";
            if (currentTheme === "dark") {
                document.body.classList.add("dark-mode");
                themeToggle.innerHTML = "🌞";
            }
        };

        // Toggle between dark and light mode
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle("dark-mode");
            let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
            localStorage.setItem("theme", theme);
            themeToggle.innerHTML = theme === "dark" ? "🌞" : "🌙";
        });

        // Add new task to the div and localStorage
        function addInDiv() {
            let data = document.getElementById("inp").value;
            if (data) {
                let task = { text: data, isCompleted: false };
                ans.push(task);
                localStorage.setItem("tasks", JSON.stringify(ans));
                addTaskToDiv(task, false);
                document.getElementById("inp").value = '';
            }
        }

        // Function to add task into the DOM and handle events
        function addTaskToDiv(task, isCompleted) {
            let dvl = document.getElementById("div-l");
            let ndv = document.createElement("div");
            let span = document.createElement("span");
            span.innerHTML = task.text;
            if (isCompleted) {
                span.style.textDecoration = "line-through";
            }

            let tick = document.createElement("button");
            tick.setAttribute("id", "tck");
            tick.innerHTML = "&check;";

            tick.addEventListener("click", () => {
                task.isCompleted = !task.isCompleted;
                span.style.textDecoration = task.isCompleted ? "line-through" : "none";
                localStorage.setItem("tasks", JSON.stringify(ans));
            });

            let cross = document.createElement("button");
            cross.setAttribute("id", "crs");
            cross.innerHTML = "&cross;";

            cross.addEventListener("click", () => {
                let index = ans.findIndex((t) => t.text === task.text);
                ans.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(ans));
                ndv.remove();
            });

            let edit = document.createElement('button');
            edit.id = "edit";
            edit.innerHTML = "edit";

            edit.addEventListener('click', () => {
                let inpInSpn = document.createElement('input');
                span.innerHTML = "";
                span.append(inpInSpn);
                inpInSpn.type = "text";
                inpInSpn.value = task.text;

                inpInSpn.addEventListener('keypress', (e) => {
                    if (e.key === "Enter") {
                        span.innerHTML = inpInSpn.value;
                        task.text = inpInSpn.value;
                        localStorage.setItem("tasks", JSON.stringify(ans));
                    }
                });
            });

            ndv.append(span, tick, cross, edit);
            dvl.append(ndv);
        }

        btn.addEventListener("click", addInDiv);