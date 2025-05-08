import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"
import cottage_image from "./cottage.jpg"
import chapel_image from "./chapel.jpg"
import farm_image from "./farm.jpg"
import tavern_image from "./tavern.jpg"
import well_image from "./well.webp"
import theater_image from "./theater.jpg"
import factory_image from "./factory.jpg"
import monument_image from "./monument.jpg"

function Cottage() {
    return(
        <div id="cottage" className="building_card">
            <div className="building_name">
                <div>Cottage</div>
                <div className="cottage_piece"></div>
            </div>
            <img src={cottage_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wheat" style={{gridArea: "2/3"}}></div>
                    <div className="brick" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">3 points if this building is fed.</div>
        </div>
    );
}

function Chapel() {
    return(
        <div id="chapel" className="building_card">
            <div className="building_name">
                <div>Chapel</div>
                <div className="chapel_piece"></div>
            </div>
            <img src={chapel_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="six">
                    <div className="glass" style={{gridArea: "2/4"}}></div>
                    <div className="stone" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                    <div className="stone" style={{gridArea: "3/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">1 point for each fed cottage.</div>
        </div>
    );
}

function Farm() {
    return(
        <div id="farm" className="building_card">
            <div className="building_name">
                <div>Farm</div>
                <div className="farm_piece"></div>
            </div>
            <img src={farm_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="wood" style={{gridArea: "2/3"}}></div>
                    <div className="wheat" style={{gridArea: "3/2"}}></div>
                    <div className="wheat" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom" style={{fontSize: "95%"}}>Feeds 4 buildings anywhere in your town.</div>
        </div>
    );
}

function Tavern() {
    return(
        <div id="tavern" className="building_card">
            <div className="building_name">
                <div>Tavern</div>
                <div className="tavern_piece"></div>
            </div>
            <img src={tavern_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="three">
                    <div className="brick" style={{gridArea: "2/2"}}></div>
                    <div className="brick" style={{gridArea: "2/3"}}></div>
                    <div className="glass" style={{gridArea: "2/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom tavern_desc" style={{fontSize: "70%"}}>Points based on your constructed taverns. 1/2/3/4/5 taverns = 2/5/8/13/20 points.</div>
        </div>
    );
}

function Well() {
    return(
        <div id="well" className="building_card">
            <div className="building_name">
                <div>Well</div>
                <div className="well_piece"></div>
            </div>
            <img src={well_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="two">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="stone" style={{gridArea: "2/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom">1 point for each adjacent chapel.</div>
        </div>
    );
}

function Theater() {
    return(
        <div id="theater" className="building_card">
            <div className="building_name">
                <div>Theater</div>
                <div className="theater_piece"></div>
            </div>
            <img src={theater_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="six">
                    <div className="stone" style={{gridArea: "2/3"}}></div>
                    <div className="wood" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                    <div className="wood" style={{gridArea: "3/4"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom theater_desc" style={{fontSize: "75%"}}>1 point for each other unqiue building in the same row and column as this building.</div>
        </div>
    );
}

function Factory() {
    return(
        <div id="factory" className="building_card">
            <div className="building_name">
                <div>Factory</div>
                <div className="factory_piece"></div>
            </div>
            <img src={factory_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="eight">
                    <div className="wood" style={{gridArea: "2/2"}}></div>
                    <div className="brick" style={{gridArea: "3/2"}}></div>
                    <div className="stone" style={{gridArea: "3/3"}}></div>
                    <div className="stone" style={{gridArea: "3/4"}}></div>
                    <div className="brick" style={{gridArea: "3/5"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom factory_description" style={{fontSize: "60%"}}>When constructed, place 1 of the 5 resources on this building. When this resource appears in the draw, you may choose any other resource.</div>
        </div>
    );
}

function Monument() {
    return(
        <div id="monument" className="building_card">
            <div className="building_name">
                <div style={{fontSize: "85%"}}>Cathedral of Caterina</div>
                <div className="monument_piece"></div>
            </div>
            <img src={monument_image}></img> 
            <div className="card_build">
                <div className="pole"></div>
                <div className="four">
                    <div className="wheat" style={{gridArea: "2/3"}}></div>
                    <div className="stone" style={{gridArea: "3/2"}}></div>
                    <div className="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div className="pole"></div>
            </div>
            <div className="building_bottom cathedral_desc">2 points. Empty squares in your town are worth 0 points (instead of -1 point).</div>
        </div>
    );
}

function Square({children, id}) {
    return(
        <div className="square" id={id}>
            {children}
        </div>
    );
}

function ResourceCard({resource, index}) {
    return(
        <div className="resource_card">
            <div id={`resource_name${index}`} className="resource_card_name">{resource}</div>
            <div className="resource_card_middle">
                <div id={`resource_block${index}`} className={`center_piece ${resource}`}></div>
            </div>
            <div className="resource_card_bottom"></div>
        </div>
    );
}

export function Game() {
    return(
        <div className="main">
            <div className="building_cards">
                <Cottage></Cottage>
                <Chapel></Chapel>
                <Farm></Farm>
                <Tavern></Tavern>
                <Well></Well>
                <Theater></Theater>
                <Factory></Factory>
            </div>
            <div className="bottom">
                <div className="resource_area">
                    <div className="block_area">
                        <div id="brick_block" className="brick" style={{gridArea: "2/2"}}></div>
                        <div id="glass_block" className="glass" style={{gridArea: "2/4"}}></div>
                        <div id="wood_block" className="wood" style={{gridArea: "2/6"}}></div>
                        <div id="stone_block" className="stone" style={{gridArea: "2/8"}}></div>
                        <div id="wheat_block" className="wheat" style={{gridArea: "2/10"}}></div>
                    </div>
                    <div className="resource_cards">
                        <ResourceCard resource={"Brick"} index={1}></ResourceCard>
                        <ResourceCard resource={"Glass"} index={2}></ResourceCard>
                        <ResourceCard resource={"Stone"} index={3}></ResourceCard>
                    </div>
                </div>
                <div id="board" className="board">
                    <Square id="00"></Square>
                    <Square id="01"></Square>
                    <Square id="02"></Square>
                    <Square id="03"></Square>
                    <Square id="10"></Square>
                    <Square id="11"></Square>
                    <Square id="12"></Square>
                    <Square id="13"></Square>
                    <Square id="20"></Square>
                    <Square id="21"></Square>
                    <Square id="22"></Square>
                    <Square id="23"></Square>
                    <Square id="30"></Square>
                    <Square id="31"></Square>
                    <Square id="32"></Square>
                    <Square id="33"></Square>
                </div>
                <div className="right">
                    <div className="monument_area">
                        <Monument></Monument>
                    </div>
                    <div className="button_area">
                        <div id="complete_town" className="button">Complete Town</div>
                        <div id="profile" className="button">Profile</div>
                    </div>
                </div>
            </div>
            <div id="cottage"></div>
        </div>
    );
}


export function renderGame() {
    const root = ReactDOM.createRoot(document.getElementById("game"));
    root.render(<Game />);
}