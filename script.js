const galleries = {
  website: [
    {
      src: "assets/screenshots/aws-static-portfolio/website/s3_live.png",
      title: "S3 Live Website Output",
      desc: "Static portfolio website opened directly from the Amazon S3 website endpoint."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/website/cloudfront_live.png",
      title: "CloudFront Live Website Output",
      desc: "Portfolio website delivered through CloudFront distribution."
    }
  ],

  s3_bucket: [
    {
      src: "assets/screenshots/aws-static-portfolio/s3_bucket/s3_static_hosting.png",
      title: "S3 Static Website Hosting",
      desc: "S3 bucket configured for static website hosting."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/s3_bucket/s3_bucket_policy.png",
      title: "S3 Bucket Policy",
      desc: "Bucket policy used for public object access."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/s3_bucket/s3_bucket_logging.png",
      title: "S3 Bucket Logging",
      desc: "Logging-related bucket configuration."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/s3_bucket/s3_objects.png",
      title: "S3 Uploaded Objects",
      desc: "Uploaded website files and related objects inside the bucket."
    }
  ],

  cloudfront: [
    {
      src: "assets/screenshots/aws-static-portfolio/cloudfront/cloudfront_distribution.png",
      title: "CloudFront Distribution",
      desc: "Main CloudFront distribution configuration."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/cloudfront/cloudfront_behaviors.png",
      title: "CloudFront Behaviors",
      desc: "Behavior settings for request handling and delivery."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/cloudfront/cloudfront_invalidation.png",
      title: "CloudFront Invalidation",
      desc: "Cache invalidation used to reflect updated deployment changes."
    }
  ],

  workflow: [
    {
      src: "assets/screenshots/aws-static-portfolio/workflow/git_push.png",
      title: "Git Push",
      desc: "Local code changes pushed from Git to GitHub."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/workflow/github_actions_success.png",
      title: "GitHub Actions Success",
      desc: "Successful GitHub Actions workflow run after deployment."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/workflow/github_actions_yaml.png",
      title: "GitHub Actions YAML",
      desc: "Workflow YAML configuration used for deployment automation."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/workflow/github_secrets.png",
      title: "GitHub Secrets",
      desc: "Repository secrets used to securely store AWS deployment credentials."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/workflow/iam_user_permissions.png",
      title: "IAM User Permissions",
      desc: "IAM permissions configured for deployment-related access."
    }
  ],

  s3_logs: [
    {
      src: "assets/screenshots/aws-static-portfolio/s3_logs/logs_list.png",
      title: "S3 Logs List",
      desc: "List view of stored log files in the S3 logs folder."
    },
    {
      src: "assets/screenshots/aws-static-portfolio/s3_logs/log_file_details.png",
      title: "Log File Details",
      desc: "Detailed view of an S3 log file object."
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
    thumb.className = `thumb ${index === currentIndex ? "active" : ""}`;
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
  const selectedGallery = galleries[galleryName];

  if (!selectedGallery || !selectedGallery.length) {
    alert("Gallery not available yet.");
    return;
  }

  currentGallery = selectedGallery;
  currentIndex = 0;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  renderGalleryItem(currentIndex);
}

function closeGallery() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

if (galleryButtons.length) {
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const galleryName = button.getAttribute("data-gallery");
      openGallery(galleryName);
    });
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderGalleryItem(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderGalleryItem(currentIndex);
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeGallery);
if (overlay) overlay.addEventListener("click", closeGallery);

document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("active")) return;

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