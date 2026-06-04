export interface HotspotData {
  id: string;
  top: string; // e.g., "45%"
  left: string; // e.g., "52%"
  label: string;
  target: string; // scene ID to transition to
}

export interface SceneData {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  hotspots: HotspotData[];
}

export interface PropertyTour {
  propertyId: string;
  scenes: SceneData[];
}

export const propertyTours: Record<string, SceneData[]> = {
  "1": [
    {
      id: "exterior",
      image: "/properties/exterior.jpg",
      title: "Main Entrance & Exterior",
      subtitle: "Smart Estate Building Front",
      description: "Modern building facade with manicured entryway and security desk.",
      hotspots: [
        {
          id: "ext-to-lobby",
          top: "55%",
          left: "50%",
          label: "Enter Lobby",
          target: "lobby"
        }
      ]
    },
    {
      id: "lobby",
      image: "/properties/lobby.jpg",
      title: "Grand Lobby",
      subtitle: "Reception & Lounge Area",
      description: "24/7 concierge, stylish lounge area, and elevator access.",
      hotspots: [
        {
          id: "lobby-to-exterior",
          top: "60%",
          left: "20%",
          label: "Go Outside",
          target: "exterior"
        },
        {
          id: "lobby-to-bedroom",
          top: "52%",
          left: "75%",
          label: "Go to Master Bedroom",
          target: "bedroom"
        }
      ]
    },
    {
      id: "bedroom",
      image: "/properties/bedroom.jpg",
      title: "Master Bedroom",
      subtitle: "Comfortable Living Space",
      description: "Spacious master suite featuring king size bed, balcony access, and custom closets.",
      hotspots: [
        {
          id: "bed-to-lobby",
          top: "65%",
          left: "30%",
          label: "Return to Lobby",
          target: "lobby"
        },
        {
          id: "bed-to-bathroom",
          top: "50%",
          left: "82%",
          label: "Enter En-suite Bathroom",
          target: "bathroom"
        }
      ]
    },
    {
      id: "bathroom",
      image: "/properties/bathroom.jpg",
      title: "En-suite Bathroom",
      subtitle: "Modern Marble Bath",
      description: "Luxury bathroom with glass walk-in shower and premium fixtures.",
      hotspots: [
        {
          id: "bath-to-bedroom",
          top: "58%",
          left: "45%",
          label: "Back to Bedroom",
          target: "bedroom"
        }
      ]
    }
  ],
  "2": [
    {
      id: "exterior",
      image: "/properties/exterior.jpg",
      title: "Villa Exterior & Pool",
      subtitle: "Outdoor Oasis",
      description: "Private pool and garden terrace of the luxury villa.",
      hotspots: [
        {
          id: "v-ext-to-lobby",
          top: "58%",
          left: "52%",
          label: "Step inside the Living Room",
          target: "lobby"
        }
      ]
    },
    {
      id: "lobby",
      image: "/properties/lobby.jpg",
      title: "Spacious Living Room",
      subtitle: "Open Concept Lounge",
      description: "Sunlit living space with floor-to-ceiling windows and high ceilings.",
      hotspots: [
        {
          id: "v-lobby-to-exterior",
          top: "62%",
          left: "15%",
          label: "Go back to Pool",
          target: "exterior"
        },
        {
          id: "v-lobby-to-bedroom",
          top: "48%",
          left: "70%",
          label: "Visit Guest Bedroom",
          target: "bedroom"
        }
      ]
    },
    {
      id: "bedroom",
      image: "/properties/bedroom.jpg",
      title: "Guest Bedroom",
      subtitle: "Cozy Garden View",
      description: "Comfortable guest suite with garden views and neutral tone aesthetics.",
      hotspots: [
        {
          id: "v-bed-to-lobby",
          top: "60%",
          left: "25%",
          label: "Go back to Living Room",
          target: "lobby"
        }
      ]
    }
  ],
  "3": [
    {
      id: "lobby",
      image: "/properties/lobby.jpg",
      title: "Main Studio Space",
      subtitle: "Efficient Cozy Living",
      description: "All-in-one studio space with custom storage, kitchen corner, and seating.",
      hotspots: [
        {
          id: "studio-to-bath",
          top: "54%",
          left: "80%",
          label: "Go to Bathroom",
          target: "bathroom"
        }
      ]
    },
    {
      id: "bathroom",
      image: "/properties/bathroom.jpg",
      title: "Studio Bathroom",
      subtitle: "Compact Utility Bath",
      description: "Clean modern bathroom with shower stall and laundry area.",
      hotspots: [
        {
          id: "studio-bath-to-main",
          top: "60%",
          left: "35%",
          label: "Return to Main Room",
          target: "lobby"
        }
      ]
    }
  ]
};
