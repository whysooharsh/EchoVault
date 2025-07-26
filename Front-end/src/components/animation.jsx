import React, { useEffect, useRef } from "react";

function EnhancedTimeCapsuleAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.2;
        this.connected = false;
      }

      getRandomColor() {
        const colors = [
          "rgba(59, 130, 246, 1)", // Blue
          "rgba(251, 191, 36, 1)", // Amber
          "rgba(239, 68, 68, 1)", // Red
          "rgba(139, 92, 246, 1)", // Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace("1)", `${this.alpha})`);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(
        50,
        Math.floor((canvas.width * canvas.height) / 10000)
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color.replace(
              "1)",
              `${0.1 * (1 - distance / 100)})`
            );
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            particles[i].connected = true;
            particles[j].connected = true;
          }
        }
      }
    };

    const drawTimeCapsule = (timestamp) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.12;
      const pulseScale = 1 + 0.05 * Math.sin(timestamp / 1000);

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.7,
        centerX,
        centerY,
        radius * 1.5
      );
      gradient.addColorStop(0, "rgba(251, 191, 36, 0.8)");
      gradient.addColorStop(1, "rgba(251, 191, 36, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
      ctx.fill();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 191, 36, 0.5)";
      ctx.fill();

      const hourHandLength = radius * 0.4;
      const minuteHandLength = radius * 0.6;

      // Hour hand
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + hourHandLength * Math.cos(timestamp / 2000),
        centerY + hourHandLength * Math.sin(timestamp / 2000)
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Minute hand
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + minuteHandLength * Math.cos(timestamp / 1000),
        centerY + minuteHandLength * Math.sin(timestamp / 1000)
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    };

    // hard to come up logic
    const drawFlowingParticles = (timestamp) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.12;

      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 3;
        const distance = Math.max(canvas.width, canvas.height) * 0.3;

        const particle = new Particle();
        particle.x = centerX + Math.cos(angle) * distance;
        particle.y = centerY + Math.sin(angle) * distance;
        particle.size = Math.random() * 2 + 1;

        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        particle.speedX = (dx / dist) * (Math.random() * 0.5 + 0.5);
        particle.speedY = (dy / dist) * (Math.random() * 0.5 + 0.5);

        particles.push(particle);

        particles = particles.filter((p) => {
          const distToCenter = Math.sqrt(
            Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)
          );
          return distToCenter > radius || Math.random() > 0.1;
        });

        // can tweak around here
        if (particles.length > 150) {
          particles.shift();
        }
      }
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawTimeCapsule(timestamp);
      drawFlowingParticles(timestamp);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasDimensions();
    animate(0);

    // Handle window resize
    window.addEventListener("resize", setCanvasDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
}

export default EnhancedTimeCapsuleAnimation;
