var users = document.getElementById("users");
var loading = document.getElementById("loading");
var maintable = document.getElementById("maintable");

async function GetAllUsers() {
  try {
    const snapshot = await firebase
      .database()
      .ref("user")
      .orderByChild("createdAt")
      .once("value");

    console.log("Firebase data:", snapshot.val());

    // Hide loading
    loading.style.display = "none";

    // Show table
    maintable.classList.remove("hide");

    // Check if no users exist
    if (!snapshot.exists()) {
      users.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">
            No user found
          </td>
        </tr>
      `;

      return;
    }

    var data = Object.values(snapshot.val());

    console.log("Before sorting:", data);

    data.sort(function (a, b) {
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    console.log("After sorting:", data);

    // Clear old table data
    users.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
      var user = data[i];

      var profileImage = "";

      if (user.image && user.image.trim() !== "") {
        profileImage = `
          <img 
            src="${user.image}" 
            alt="${user.name || "Student"}"
            class="student-profile"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';"
          />

          <span 
            class="no-image"
            style="display:none;"
          >
            No image
          </span>
        `;
      } else {
        profileImage = `
          <span class="no-image">
            No image
          </span>
        `;
      }

      users.innerHTML += `
        <tr>

          <td>
            ${i + 1}
          </td>

          <td>
            <div class="student-name">
              ${user.name || "N/A"}
            </div>
          </td>

          <td>
            <div class="student-email">
              ${user.email || "N/A"}
            </div>
          </td>

          <td>
            <span class="course">
              ${user.courseName || "test users"}
            </span>
          </td>

          <td>
            <div class="profile-container">
              ${profileImage || "no image"}
            </div>
          </td>

          <td>
            <span class="status">
              ${"active"}
            </span>
          </td>

        </tr>
      `;
    }
  } catch (error) {
    console.error("Error loading users:", error);

    // // Hide loading
    // loading.style.display = "none";

    // // Show table
    // maintable.classList.remove("hide");

    // // Show error
    // users.innerHTML = `
    //   <tr>
    //     <td colspan="6" style="text-align:center;">
    //       Failed to load users
    //     </td>
    //   </tr>
    // `;
  }
}

GetAllUsers();
