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
      illustration: string;
    }
    interface NoteCategory {
      id: number;
      name: string;
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
  }
}
