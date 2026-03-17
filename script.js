const galleries = {
  website: [
    {
      src: "assets/screenshots/website/s3_url_homepage.png",
      title: "S3 Website URL",
      desc: "Static website opened directly from the Amazon S3 website endpoint."
    },
    {
      src: "assets/screenshots/website/cloudfront_url_homepage.png",
      title: "CloudFront Website URL",
      desc: "Portfolio website delivered through CloudFront distribution for content delivery."
    }
  ],

  s3_bucket: [
    {
      src: "assets/screenshots/s3_bucket/bucket_properties.png",
      title: "Bucket Properties",
      desc: "Amazon S3 bucket configuration and general setup view."
    },
    {
      src: "assets/screenshots/s3_bucket/bucket_policy.png",
      title: "Bucket Policy",
      desc: "S3 bucket policy used for object access and website visibility."
    },
    {
      src: "assets/screenshots/s3_bucket/bucket_logging.png",
      title: "Bucket Logging",
      desc: "Logging-related configuration for S3 bucket observation."
    }
  ],

  cloudfront: [
    {
      src: "assets/screenshots/cloudfront/general_tab.png",
      title: "CloudFront General Tab",
      desc: "General distribution configuration for CloudFront delivery."
    },
    {
      src: "assets/screenshots/cloudfront/behaviors_tab.png",
      title: "CloudFront Behaviors Tab",
      desc: "Behaviour rules and request handling settings in CloudFront."
    }
  ],

  // ✅ FIXED: separate s3_logs section
  s3_logs: [
    {
      src: "assets/screenshots/s3_logs/logs_list.png",
      title: "Logs List",
      desc: "List view of stored S3 access log files."
    },
    {
      src: "assets/screenshots/s3_logs/log_file_details.png",
      title: "Log File Details",
      desc: "Detailed view of an S3 access log file."
    }
  ]
};

const modal = document.getElementById("galleryModal");
const overlay = document.getElementById("galleryOverlay");
const closeBtn = document.getElementById("galleryClose");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryDesc = document.getElementById("galleryDesc");
const thumbsContainer = document.getElementById("galleryThumbs");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const galleryButtons = document.querySelectorAll(".gallery-btn");

let currentGallery = [];
let currentIndex = 0;

function renderGalleryItem(index) {
  const item = currentGallery[index];
  if (!item) return;

  galleryImage.src = item.src;
  galleryImage.alt = item.title;
  galleryTitle.textContent = item.title;
  galleryDesc.textContent = item.desc;

  renderThumbs();
}

function renderThumbs() {
  thumbsContainer.innerHTML = "";

  currentGallery.forEach((item, index) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.innerHTML = `
      <img src="${item.src}" alt="${item.title}">
      <p>${item.title}</p>
    `;

    thumb.addEventListener("click", () => {
      currentIndex = index;
      renderGalleryItem(currentIndex);
    });

    thumbsContainer.appendChild(thumb);
  });
}

function openGallery(galleryName) {
  currentGallery = galleries[galleryName] || [];
  currentIndex = 0;

  if (!currentGallery.length) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  renderGalleryItem(currentIndex);
}

function closeGallery() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

galleryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const galleryName = button.getAttribute("data-gallery");
    openGallery(galleryName);
  });
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  renderGalleryItem(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  renderGalleryItem(currentIndex);
});

closeBtn.addEventListener("click", closeGallery);
overlay.addEventListener("click", closeGallery);

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderGalleryItem(currentIndex);
  }
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderGalleryItem(currentIndex);
  }
});