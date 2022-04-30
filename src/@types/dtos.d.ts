declare namespace DTOS {
  namespace Output {
    interface Density {
      id: number;
      name: string;
    }
    interface Note {
      id: number;
      note_category_id: number;
      eng: string;
      kor: string;
      image: string;
      illustration: string | null;
    }
    interface NoteCategory {
      id: number;
      name: string;
    }
    interface Tag {
      tag_category_id: number;
      name: string;
      id: number;
    }
    interface TagCategory {
      id: number;
      name: string;
    }
    interface Brand {
      id: number;
      eng: string;
      kor: string;
      image: string;
    }
    interface NoteCategory {
      id: number;
      name: string;
    }
    interface Note {
      note_category_id: number;
      eng: string;
      kor: string;
      image: string;
      illustration: string;
      id: number;
    }
    interface Density {
      id: number;
      name: string;
    }
    interface Accord {
      id: number;
      eng: string;
      kor: string;
      image: string;
    }
    interface Tag {
      tag_category_id: number;
      name: string;
      id: number;
    }

    interface Perfume {
      id: number;
      kor: string;
      eng: string;
      image: string;
      capacity: number;
      price: number;
      is_single: boolean;
      brand: Brand;
      density: Density;
      subtitle: "123";
      title: "123";
      perfume_accords: {
        id: number;
        accord_id: number;
        perfume_id: number;
        accord: Accord;
      }[];
      perfume_notes: {
        id: number;
        perfume_id: number;
        note_id: number;
        type: "T" | "M" | "B" | "S";
        note: Note;
      }[];
      perfume_tags: {
        id: number;
        tag_id: number;
        perfume_id: number;
        tag: Tag;
      }[];
    }
  }
}
