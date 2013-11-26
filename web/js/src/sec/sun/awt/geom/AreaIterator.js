var sec=sec || {};
sec.sun=sec.sun || {};
sec.sun.awt=sec.sun.awt || {};
sec.sun.awt.geom=sec.sun.awt.geom || {};
sec.sun.awt.geom.AreaIterator=function()
{


    //﻿Clazz.declarePackage ("sec.sun.awt.geom");
    //c$ = Clazz.decorateAsClass (function () {
    this.transform = null;
    this.curves = null;
    this.index = 0;
    this.prevcurve = null;
    this.thiscurve = null;
    //Clazz.instantialize (this, arguments);
    //}, sec.sun.awt.geom, "AreaIterator");
    //Clazz.makeConstructor (c$, 
    var curves;
    var at;
    //function (curves, at) {
    if(arguments.length==2)  
    {
        curves=arguments[0];
        at=arguments[1];
      
        this.curves = curves;
        this.transform = at;
        if (curves.size () >= 1) {
            this.thiscurve = curves.get (0);
        }
    }
    //    }, "sec.sun.awt.geom.Vector,armyc2.c2sd.graphics2d.AffineTransform");
    //Clazz.defineMethod (c$, "getWindingRule", 
    this.getWindingRule=function () {
        return 1;
    };//);
    //Clazz.defineMethod (c$, "isDone", 
    this.isDone=function () {
        return (this.prevcurve == null && this.thiscurve == null);
    };//);
    //Clazz.defineMethod (c$, "next", 
    this.next=function () {
        if (this.prevcurve != null) {
            this.prevcurve = null;
        } else {
            this.prevcurve = this.thiscurve;
            this.index++;
            if (this.index < this.curves.size ()) {
                this.thiscurve = this.curves.get (this.index);
                if (this.thiscurve.getOrder () != 0 && this.prevcurve.getX1 () == this.thiscurve.getX0 () && this.prevcurve.getY1 () == this.thiscurve.getY0 ()) {
                    this.prevcurve = null;
                }
            } else {
                this.thiscurve = null;
            }
        }
    };//);
    //Clazz.defineMethod (c$, "currentSegmentFlt", 
    this.currentSegmentFlt=function (coords) {
        var dcoords =  Clazz.newArray (6, 0);
        var segtype = this.currentSegment (dcoords);
        var numpoints = (segtype == 4 ? 0 : (segtype == 2 ? 2 : (segtype == 3 ? 3 : 1)));
        for (var i = 0; i < numpoints * 2; i++) {
            coords[i] = dcoords[i];
        }
        return segtype;
    };//, "~A");
    //Clazz.defineMethod (c$, "currentSegment", 
    this.currentSegment=function (coords) {
        var segtype = 0;
        var numpoints = 0;
        if (this.prevcurve != null) {
            if (this.thiscurve == null || this.thiscurve.getOrder () == 0) {
                return 4;
            }
            coords[0] = this.thiscurve.getX0 ();
            coords[1] = this.thiscurve.getY0 ();
            segtype = 1;
            numpoints = 1;
        } else if (this.thiscurve == null) {
        } else {
            segtype = this.thiscurve.getSegment (coords);
            numpoints = this.thiscurve.getOrder ();
            if (numpoints == 0) {
                numpoints = 1;
            }
        }
        if (this.transform != null) {
            this.transform.transform (coords, 0, coords, 0, numpoints);
        }
        return segtype;
    };//, "~A");
};