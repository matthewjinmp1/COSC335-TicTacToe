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
        <div id="cottage" class="building_card">
            <div class="building_name">
                <div>Cottage</div>
                <div class="cottage_piece"></div>
            </div>
            <img src={cottage_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="four">
                    <div class="wheat" style={{gridArea: "2/3"}}></div>
                    <div class="brick" style={{gridArea: "3/2"}}></div>
                    <div class="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom">3 points if this building is fed.</div>
        </div>
    );
}

function Chapel() {
    return(
        <div id="chapel" class="building_card">
            <div class="building_name">
                <div>Chapel</div>
                <div class="chapel_piece"></div>
            </div>
            <img src={chapel_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="six">
                    <div class="glass" style={{gridArea: "2/4"}}></div>
                    <div class="stone" style={{gridArea: "3/2"}}></div>
                    <div class="glass" style={{gridArea: "3/3"}}></div>
                    <div class="stone" style={{gridArea: "3/4"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom">1 point for each fed cottage.</div>
        </div>
    );
}

function Farm() {
    return(
        <div id="farm" class="building_card">
            <div class="building_name">
                <div>Farm</div>
                <div class="farm_piece"></div>
            </div>
            <img src={farm_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="four">
                    <div class="wood" style={{gridArea: "2/2"}}></div>
                    <div class="wood" style={{gridArea: "2/3"}}></div>
                    <div class="wheat" style={{gridArea: "3/2"}}></div>
                    <div class="wheat" style={{gridArea: "3/3"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom">Feeds 4 buildings anywhere in your town.</div>
        </div>
    );
}

function Tavern() {
    return(
        <div id="tavern" class="building_card">
            <div class="building_name">
                <div>Tavern</div>
                <div class="tavern_piece"></div>
            </div>
            <img src={tavern_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="three">
                    <div class="brick" style={{gridArea: "2/2"}}></div>
                    <div class="brick" style={{gridArea: "2/3"}}></div>
                    <div class="glass" style={{gridArea: "2/4"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom tavern_desc">Points based on your constructed taverns. <br></br> 1/2/3/4/5 taverns = 2/5/8/13/20 points.</div>
        </div>
    );
}

function Well() {
    return(
        <div id="well" class="building_card">
            <div class="building_name">
                <div>Well</div>
                <div class="well_piece"></div>
            </div>
            <img src={well_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="two">
                    <div class="wood" style={{gridArea: "2/2"}}></div>
                    <div class="stone" style={{gridArea: "2/3"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom">1 point for each adjacent chapel.</div>
        </div>
    );
}

function Theater() {
    return(
        <div id="theater" class="building_card">
            <div class="building_name">
                <div>Theater</div>
                <div class="theater_piece"></div>
            </div>
            <img src={theater_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="six">
                    <div class="stone" style={{gridArea: "2/3"}}></div>
                    <div class="wood" style={{gridArea: "3/2"}}></div>
                    <div class="glass" style={{gridArea: "3/3"}}></div>
                    <div class="wood" style={{gridArea: "3/4"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom theater_desc">1 point for each other unqiue building in the same row and column as this building.</div>
        </div>
    );
}

function Factory() {
    return(
        <div id="factory" class="building_card">
            <div class="building_name">
                <div>Factory</div>
                <div class="factory_piece"></div>
            </div>
            <img src={factory_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="eight">
                    <div class="wood" style={{gridArea: "2/2"}}></div>
                    <div class="brick" style={{gridArea: "3/2"}}></div>
                    <div class="stone" style={{gridArea: "3/3"}}></div>
                    <div class="stone" style={{gridArea: "3/4"}}></div>
                    <div class="brick" style={{gridArea: "3/5"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom factory_description">When constructed, place 1 of the 5 resources on this building. When this resource appears in the draw, you may choose any other resource.</div>
        </div>
    );
}

function Monument() {
    return(
        <div id="monument" class="building_card">
            <div class="building_name">
                <div>Cathedral of Caterina</div>
                <div class="monument_piece"></div>
            </div>
            <img src={monument_image}></img> 
            <div class="card_build">
                <div class="pole"></div>
                <div class="four">
                    <div class="wheat" style={{gridArea: "2/3"}}></div>
                    <div class="stone" style={{gridArea: "3/2"}}></div>
                    <div class="glass" style={{gridArea: "3/3"}}></div>
                </div>
                <div class="pole"></div>
            </div>
            <div class="building_bottom cathedral_desc">2 points. Empty squares in your town are worth 0 points (instead of -1 point).</div>
        </div>
    );
}

function Square({children, id}) {
    return(
        <div class="square" id={id}>
            {children}
        </div>
    );
}

function ResourceCard({resource, index}) {
    return(
        <div class="resource_card">
            <div id={`resource_name${index}`} class="resource_card_name">{resource}</div>
            <div class="resource_card_middle">
                <div id={`resource_block${index}`} class={`center_piece ${resource}`}></div>
            </div>
            <div class="resource_card_bottom"></div>
        </div>
    );
}

function Game() {
    return(
        <div class="main">
            <div class="building_cards">
                <Cottage></Cottage>
                <Chapel></Chapel>
                <Farm></Farm>
                <Tavern></Tavern>
                <Well></Well>
                <Theater></Theater>
                <Factory></Factory>
            </div>
            <div class="bottom">
                <div class="resource_area">
                    <div class="block_area">
                        <div id="brick_block" class="brick" style={{gridArea: "2/2"}}></div>
                        <div id="glass_block" class="glass" style={{gridArea: "2/4"}}></div>
                        <div id="wood_block" class="wood" style={{gridArea: "2/6"}}></div>
                        <div id="stone_block" class="stone" style={{gridArea: "2/8"}}></div>
                        <div id="wheat_block" class="wheat" style={{gridArea: "2/10"}}></div>
                    </div>
                    <div class="resource_cards">
                        <ResourceCard resource={"Brick"} index={1}></ResourceCard>
                        <ResourceCard resource={"Glass"} index={2}></ResourceCard>
                        <ResourceCard resource={"Stone"} index={3}></ResourceCard>
                    </div>
                </div>
                <div id="board" class="board">
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
                <div class="right">
                    <div class="monument_area">
                        <Monument></Monument>
                        <div></div>
                    </div>
                    <div class="button_area">
                        <div id="complete_town" class="complete_town">Complete Town</div>
                        <div id="achievements" class="achievements">Achievements</div>
                    </div>
                </div>
            </div>
            <div id="cottage"></div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("game"));
root.render(<Game />);
