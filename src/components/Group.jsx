
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Group({ setSelectedGroupId, setActiveGroupName, setActiveGroupDesc }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupsList = JSON.parse(localStorage.getItem("groups"));
    if (groupsList) {
      setGroups(groupsList);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className='flex flex-wrap justify-center mt-7 gap-x-4 gap-y-4 p-3'>
        {groups.map((group) => (
          <div className="w-full sm:w-[50%] md:w-[30%] lg:w-[25%] xl:w-[20%] h-auto bg-gray-50 px-3 pt-3 pb-28 relative rounded-md shadow-lg" key={group.groupId}>
            {group.groupImage===null ?
              
              <img
              src="https://www.freeiconspng.com/uploads/black-group-png-6.png"
              alt="Group Image"
              className="w-24 h-24 rounded-full relative left-[35%] top-[-35px]"
            />
              :
              <img
              src={group?.groupImage?.mainImageURL}
              alt="Group Image"
              className="w-24 h-24 rounded-full relative left-[35%] top-[-35px]"
            /> 
            }
            <h2 className='text-center break-words font-bold mb-5'>{group.groupName}</h2>
            <p className="text-center break-words text-gray-400">
              {group.groupDescription}
            </p>
            <p className="text-center mt-7">{group.noOfCards} Cards</p>
            <div className="">
              <Link to={`/Groups/${group.groupName}`}>
                <button
                  className="border-solid border-2 mb-3 px-3 w-[90%] text-red-600 font-bold  border-red-600 absolute bottom-0 left-[5%]"
                  value={group.groupId}
                  type="button"
                  onClick={(e) =>
                    (
                      setSelectedGroupId(e.target.value),
                      setActiveGroupName(group.groupName),
                      setActiveGroupDesc(group.groupDescription)
                    )
                  }
                >
                  View Cards
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Group;
