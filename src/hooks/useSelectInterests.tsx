import { useState } from "react";

export const useSelectInterests = () => {
    const [selectedInterests, setSelectedInterests] = useState<number[]>([]);    

    const handleSelect = (interestId: number) => {
        if (selectedInterests.includes(interestId)) {
          setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        } else if (selectedInterests.length < 3) {
          setSelectedInterests([...selectedInterests, interestId]);
        }
      };

    return {handleSelect, selectedInterests}

}